function DynForm (obj) {
  this.DynObject = DynObject
  this.DynObject()

  this.Obj = obj
//  this.id = (this.Obj.id) ? this.Obj.id : this.Obj.name
  this.id = this.Obj.name
  this.name = (this.Obj.name) ? this.Obj.name : this.Obj.id
  this.children = []
}

DynForm.prototype = new DynObject();
DynForm.prototype.isDynForm = true;

DynForm.prototype.init = function () {
  var childCollection = ""
  for ( var childIndex=0; (childIndex < this.Obj.elements.length); childIndex++) {
    switch ( this.Obj.elements[childIndex].type ) {

      case 'text':
          this.children[childIndex] = new DynInputText(this.Obj.elements[childIndex])
      break;

      case 'hidden':
          this.children[childIndex] = new DynInputHidden(this.Obj.elements[childIndex])
      break;

      case 'radio':
          this.children[childIndex] = new DynInputRadio(this.Obj.elements[childIndex])
      break;

      case 'file':
          this.children[childIndex] = new DynInputFile(this.Obj.elements[childIndex])
      break;

      case 'select-one':
          this.children[childIndex] = new DynInputSelect(this.Obj.elements[childIndex])
      break;

      case 'checkbox':
          this.children[childIndex] = new DynInputCheckbox(this.Obj.elements[childIndex])
      break;

      default:
          this.children[childIndex] = new DynInput(this.Obj.elements[childIndex])
      break;
    }

    childCollection += this.Obj.elements[childIndex].type + '\n'
    
  }
//  alert (childCollection)
}

/// this is the generic input object that will work out
// of the box for hidden and text... and will be expanded on
/// for others. 

function DynInput (obj) {
    this.DynObject = DynObject
    this.DynObject()

    //alert ('creating new ' + obj.type + ' input object ' + obj.name)
    this.Obj = obj
    //this.id = obj.id
    this.name = obj.id
    this.parent = obj.form
    this.form = obj.form
    
}

DynInput.prototype = new DynObject();
DynInput.prototype.isDynInput = true;

DynInput.prototype.init = function () {
// point to my real object
  this.initialValue = this.getValue()
}

DynInput.prototype.getValue = function () {
  return this.Obj.value
}

DynInput.prototype.setValue = function (value) {
  this.Obj.value = value
}

DynInput.prototype.reset = function () {
  this.Obj.value = this.initialValue
}

function DynInputText (obj) {
  this.name = obj.name
  this.DynInput = new DynInput (obj)
  this.prototype = DynInput.prototype
}

function DynInputRadio (obj) {
  this.name = obj.name
  this.DynInput = new DynInput (obj)
  this.prototype = DynInput.prototype
}

function DynInputCheckbox (obj) {
  this.name = obj.name
  this.DynInput = new DynInput (obj)
  this.prototype = DynInput.prototype

}

function DynInputFile (obj) {
// alert ('file input type not supported')
}


function DynInputHidden (obj) {
  this.name = obj.name
  this.DynInput = new DynInput (obj)
  this.prototype = DynInput.prototype
}

function DynInputSelect (obj) {
  this.Obj = obj
  this.name = obj.name
  this.DynInput = new DynInput (obj)
  this.prototype = DynInput.prototype
  this.options = []
  for (var optionsIndex=0; optionsIndex<this.Obj.options.length; optionsIndex++) {
    this.options[optionsIndex] = new DynInputSelectOption (this.Obj.options[optionsIndex], optionsIndex)
  }
}

function DynInputSelectOption (obj, position) {
  this.text = obj.text
  this.value = obj.value
  this.selected = obj.selected
  this.index = position
}

DynInputSelect.prototype.getValue = function () {
    return this.Obj.options[this.Obj.selectedIndex].value
}

DynInputSelect.prototype.setValue = function (value) {
    alert ('can\'t do this yet')
}
