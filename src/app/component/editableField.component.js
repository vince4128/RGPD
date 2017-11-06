(function () {
    'use strict';

    angular
        .module('app.component')
        .component('editableField', {
            templateUrl: './app/template/editablefield/editableField.html',
            controller: EditableFieldController,
            bindings: {
                fieldValue: '<',
                fieldType: '@?',
                onUpdate: '&'
            }
        })

    EditableFieldController.$inject = ['$scope', '$element', '$attrs'];
    function EditableFieldController($scope, $element, $attrs) {
        var ctrl = this;
        ctrl.editMode = false;

        ctrl.handleModeChange = function () {
            if (ctrl.editMode) {
                ctrl.onUpdate({ value: ctrl.fieldValue });
                ctrl.fieldValueCopy = ctrl.fieldValue;
            }
            ctrl.editMode = !ctrl.editMode;
        };

        ctrl.reset = function () {
            ctrl.fieldValue = ctrl.fieldValueCopy;
        };

        ctrl.$onInit = function () {
            // Make a copy of the initial value to be able to reset it later
            ctrl.fieldValueCopy = ctrl.fieldValue;

            // Set a default fieldType
            if (!ctrl.fieldType) {
                ctrl.fieldType = 'text';
            }
        };
    }
}());