var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var rename     = require('gulp-rename');
var es         = require('event-stream');
var minifyCSS = require('gulp-minify-css');
var livereload = require('gulp-livereload');
var notify = require('gulp-notify');
var fs = require('fs');
var less = require('gulp-less');

// 環境變數
var env = 'dev'; // dev||prod

var live = livereload();
livereload.listen();

// 路徑變數
var paths = {
    main: './app/js/boot.js',
    result: './app/js/result.js',
    css: './app/assets/css/*.css',
    less: './app/assets/less/*.less',
    destDir: 'public'
};

gulp.task('build-less', function () {
  return gulp.src(paths.less)
    .pipe(less())
    //.pipe(source(paths.less))
    .pipe(gulp.dest(paths.destDir + '/app/css/'));
});

/**
 *
 */
gulp.task('bundle-js', function() {

    // console.log( '\nbundle-js 跑' );

    // we define our input files, which we want to have
    // bundled:
    var files = [
        paths.main, 
        paths.result
    ];
    // map them to our stream function
    var tasks = files.map(function(entry) {
        return browserify({
            entries:[entry]
        })

        // 最優先編譯 jsx，確保後面其它 transform 運行無誤
        .transform( 'reactify' )

        // 所有檔案合併為一，並指定要生成 source map
        .bundle({debug: true})

        .on('error', function( err ){
            console.log( '[錯誤]', err );
            this.end();
            gulp.src('').pipe( notify('✖ Bunlde Failed ✖') )
        })

        // 利用 vinyl-source-stream 幫檔案取名字
        .pipe(source(entry))
        // rename them to have "bundle as postfix"
        .pipe(rename({
            extname: '-bundle.js'
        }))

        // 接著就回到 gulp 系統做剩下事
        // 這裏是直接存檔到硬碟
        .pipe( gulp.dest(paths.destDir) )
    });
    // create a merged stream
    return es.merge.apply(null, tasks);
});

/**
 * 縮短 app.css
 */
// gulp.task('minify-css', function() {
//   gulp.src( paths.css )
//     .pipe(minifyCSS(
//       {
//           noAdvanced: false,
//           keepBreaks:true,
//           cache: true // 這是 gulp 插件獨有的
//       }))
//     .pipe(gulp.dest( paths.destCSS ))
// });


/**
 * 將 index.html 與 css/ 複製到 build/ 下面
 * 才方便測試
 */
// gulp.task('copy', function(){
//     return gulp.src([ 'app/index.html' ], { base: 'app' } )
//     .pipe( gulp.dest(paths.destDir));
// })


/**
 * 監控 app/ 下所有 js, jsx, html, css 變化就重新編譯
 */
gulp.task('watch', function() {
    // console.log( 'watch 跑' );

    gulp.watch( 'app/**/*', ['build-less','bundle-js', 'refresh'] );
});

/**
 * livereload refresh
 */
gulp.task( 'refresh', function(){
    // console.log( '\nlivereload > refresh\n' );
    setTimeout(function(){
      live.changed('');
    }, 500)
})


//========================================================================
//
// 總成的指令集


/**
 * 初期讓 default 就是跑 dev task，將來可能會改成有 build, deploy 等花樣
 */
gulp.task('default', ['dev']);

/**
 * 編譯與打包 jsx 為一張檔案
 * 廣播 livereload 事件
 * 啟動 8000 server 供本地跑
 */
gulp.task('dev', ['build-less', 'bundle-js', 'watch'] );
