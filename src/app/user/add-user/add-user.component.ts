import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'child-cell',
  template:`<button type="button" *ngIf="isNew == true" (click) = "onEditClick()"data-toggle="modal"
  data-target="#EditModal" data-action-type="view" class="btn btn-success">
  Edit
</button>
<button type="button"  *ngIf="isNew == false" (click) = "onUpdateClick()" data-action-type="view"  class="btn btn-success">
Update
</button>

<button type="button" *ngIf="isNew == false" (click) = "onCancelClick()" data-action-type="view" class="btn btn-dark">
Cancel
</button>




`,
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements ICellRendererAngularComp {
  public params: any;
  public isNew: any;
  public previousData:any;
 abc:any;
  gridApi: any;
  constructor(private userService:UserService) {this.isNew=true }

  agInit(params: any): void {
    debugger
    this.params = params;
}

 

refresh(): boolean {
  return false;
}

onEditClick() {

  debugger;

  let index = this.params.node.rowIndex;
// this.params.cancelOtherRowEditors(index);
  this.isNew = false;
  this.previousData = JSON.parse(JSON.stringify(this.params.node.data));
  let cols = this.params.columnApi.getAllGridColumns();
  let firstCol = {
      "colId": ""
  }
  if (cols) {
      firstCol = cols[0];
  }
  let rowIndex = this.params.node.rowIndex;
  this.params.api.setFocusedCell(rowIndex, firstCol.colId);
  this.params.api.startEditingCell({
      rowIndex: rowIndex,
      colKey: "name"
  });

}
public invokeParentMethod() {
  this.params.context.componentParent.methodFromParent(`Row: ${this.params.node.rowIndex}, Col: ${this.params.colDef.headerName}`)
}

public onCancelClick() {
  debugger
  this.isNew = true;
  this.params.node.setData(this.previousData);
  this.params.api.stopEditing(true);
}


// onDeleteClick() {
// const selectedData = this.params.node.data.email;
// console.log(selectedData);
// this.userService.DeleteUser(selectedData).subscribe(
//   (response)=>{

//   },
//   (error)=>{
//     console.log(error);
//   }
// )

// }
onUpdateClick() {
  debugger;
  this.isNew = true;
  let obj: any ;
  
  this.params.api.stopEditing();
  obj = this.params.data;
  this.userService.UpdateUser(obj).subscribe(
    (response)=>{

    },
    (error)=>{
      console.log(error)
    }
  )


  // update logic ....
}
}
