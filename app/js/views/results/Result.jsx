var ProdIntro = React.createFactory(require('./ProdIntro.jsx'));

var ResultItem = React.createFactory(require('./ResultItem.jsx'));
var _prods = [];
var _isSuccess = [];
var comp = React.createClass({
    getInitialState: function() {
      return {
        prods: []
      };
    },
    getProdsData: function(entry) {
      $.ajax({
          type: 'GET',
          url: entry.url,
          dataType: 'json', //specify jsonp
          success: function(data) {
            data.isSuccess = true;
            _prods.push(data);
          }.bind(this),
          error: function(e) {
            _prods.push({isSuccess: false});
            console.log('error', e);
          }.bind(this),
          complete: function(e) {
            console.log(_prods);
            this.setState({
              prods: _prods
            });
          }.bind(this)
        });
    },
    componentWillMount: function() {
        var prod = JSON.parse(document.getElementById('prodObj').getAttribute('data-prod'));
        //console.log(prod);
        /*
         * http://localhost:3000/api/SPKGE15102505A
         * http://localhost:3000/api/SPK05GEA2515AA
         */
        prod.forEach(function(entry) {
          //console.log('entry: ',entry);
          this.getProdsData(entry);
        }, this);
        

    },
    
    render: function() {
      //console.log('this.state.prods', this.state.prods);
      var arr = this.state.prods.map(function(item) {
        return <ResultItem key={item.pfProdNo} prod={item}/>
      });
      return (
        <div className="container">
          <h1 className="text-main-title text-logo-green">國外旅遊商品比較</h1>
          <ProdIntro prods={this.state.prods}/>
       
        </div>
      );
    }
});

module.exports = comp;