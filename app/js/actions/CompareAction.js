/**
 * 
 */
var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');
var Promise = require('es6-promise').Promise;

/**
 * 這是一個 singleton 物件
 */
var CompareAction = {

    /**
     * app 啟動後，第一次載入資料
     */
    load: function(){
		//        
    },

    /**
     * 
     */
    createItem: function( item ) {

        // 1. 廣播給 store 知道去 optimistic 更新 view
        AppDispatcher.handleViewAction({

            // type 是為了方便將來所有 Store 內部判斷是否要處理這個 action
            actionType: AppConstants.ITEM_CREATE,

            // 這裏是真正要傳出去的值
            item: item
        });

    },

    /**
     * 
     */
    // selectItem: function( item ) {

    //     AppDispatcher.handleViewAction({
    //         actionType: AppConstants.ITEM_SELECT,
    //         item: item
    //     });
        
    // },

    /**
     * 
     */
    removeItem: function( item ) {

        AppDispatcher.handleViewAction({
            actionType: AppConstants.ITEM_REMOVE,
            item: item
        });

    },

    removeAll: function() {

        AppDispatcher.handleViewAction({
            actionType: AppConstants.ALL_REMOVE
        });

    },

    /**
     * 
     */
    // updateItem: function( item, newVal ) {

    //     AppDispatcher.handleViewAction({
    //         actionType: AppConstants.ITEM_UPDATE,
    //         item: item, 
    //         newVal: newVal
    //     });

    // },

    /**
     * 
     */
    updateStorage: function( newVal ) {

        AppDispatcher.handleViewAction({
            actionType: AppConstants.ITEM_UPDATE,
            newVal: newVal
        });

    },

    showAlert: function() {
        console.log('showAlert');
        AppDispatcher.handleViewAction({
            actionType: AppConstants.SHOW_ALERT
        });

    },

    hideAlert: function() {
        console.log('showAlert');
        AppDispatcher.handleViewAction({
            actionType: AppConstants.HIDE_ALERT
        });

    },
    /**
     * 
     */
    // doSearch: function( val ) {

    //     AppDispatcher.handleViewAction({
    //         actionType: AppConstants.TODO_FILTER,
    //         val: val
    //     });

    // },

    // dummy
    noop: function(){}
};

module.exports = CompareAction;
