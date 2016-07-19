(function(){
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController",WebsiteListController);
    function WebsiteListController($routeParams,WebsiteService){
        
        var vm = this;
        vm.userId = $routeParams.userId;
        function init(){
            WebsiteService
                .findWebsitesByUser($routeParams.userId)
                .then(function(response){
                    vm.websites=response.data;
                },
                function(response){
                    vm.error="sorry please try again"});
        }
        init();
    }
})();