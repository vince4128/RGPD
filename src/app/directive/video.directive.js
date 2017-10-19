(function () {
    'use strict';

    angular
        .module ('app.core')
        .directive ('video', video);

    video.$inject = [];

    function video() {
        // Usage:
        //     <directive></directive>
        // Creates:
        //
        var directive = {
            link: link,
            restrict: 'A',
            templateUrl: './app/template/video/video.html',
            scope:{
                item: '='
            },
            controller: videoController,
            controllerAs: 'vm',
            bindToController: true
        };
        return directive;

        function link(scope, element, attrs) {
            element[0].querySelector('#video').addEventListener('ended',videoEndHandler,false);
            function videoEndHandler(e){
                scope.$apply(function(){
                    scope.$emit('readevent',true);
                })
                
            }
        }
    }

    videoController.$inject = ['$scope'];

    function videoController($scope){

        var vm = this;
        //////////////

        vm.videoEnd = videoEnd;

        function videoEnd(){
            $scope.$emit('readevent',true);
        }

    }

})();