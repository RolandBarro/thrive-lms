import { Component, TemplateRef, ViewChild } from '@angular/core';

import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { UserFormComponent } from './components/user-form/user-form.component';
import { User } from './models/user.model';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  modalRef: BsModalRef = new BsModalRef();

  // @ViewChild('deleteDialog') deleteDialog: BsModalRef = new BsModalRef();
  deleteDialog: BsModalRef = new BsModalRef();
  selectedIndex: number | null = null;

  // TODO: do not duplicate code
  user: User = {
    id: '',
    fullName: '',
    email: '',
    contactNumber: '',
  }

  // public
  users: User[] = [
    { id: '1001', fullName: 'The User', email: 'the@email.com', contactNumber: '+693928312346' }
  ];

  // private

  constructor(private modalService: BsModalService) {}

  onEventAction(data: any, template: TemplateRef<any>) {
    const { event, index } = data;

    if (event === 'add') {
      this.modalRef = this.modalService.show(UserFormComponent);
      this.modalRef.content.saveUser
        .subscribe((data: any) => {
          const length = this.users.length;
          this.users.push({ id: `100${length + 1}`, ...data });
          this.modalRef.hide();
        });
    } else if (event === 'edit') {
      this.modalRef = this.modalService.show(UserFormComponent);
      this.modalRef.content.methodType = event;

      console.log('this.users: ', this.users)
      console.log('index: ', index);

      this.modalRef.content.user = { ...this.users[index] };
      this.modalRef.content.saveUser
        .subscribe((data: any) => {
          this.users[index] = { ...data };
          this.modalRef.hide();
        });
    } else if (event === 'delete') {
      this.selectedIndex = index;
      this.deleteDialog = this.modalService.show(template);
    }
  }

  onBtnClick(action: string) {
    switch(action) {
      case 'save':
        const { fullName, email, contactNumber } = this.user;
        if (fullName && (email || contactNumber)) {
          this.users.push(this.user);
          this.modalRef.hide();
          this.clear();
        } else {
          console.log('error: Empty Fields detected!')  ;
        }
    }
  }

  clear() {
    this.user = {
      id: '',
      fullName: '',
      email: '',
      contactNumber: '',
    }
  }

  onSaveUser(event: any) {
    console.log('onSaveUser: ', event);
  }

  onDeleteAction(action: string) {
    console.log('action: ', action);
    if (action === 'cancel') {
      this.deleteDialog.hide();
    } else if (action === 'delete') {
      this.users = this.users.filter((user, i) => i !== this.selectedIndex);
      this.deleteDialog.hide();
    }
  }
}
