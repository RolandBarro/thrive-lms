import { Component, TemplateRef } from '@angular/core';

import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { User } from './models/user.model';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  modalRef: BsModalRef = new BsModalRef();

  // TODO: do not duplicate code
  user: User = {
    fullName: '',
    email: '',
    contactNumber: '',
  }

  // public
  users: User[] = [
    { fullName: 'The User', email: 'the@email.com', contactNumber: '+639281313121' }
  ];

  // private

  constructor(private modalService: BsModalService) {}

  addUser(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
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
      fullName: '',
      email: '',
      contactNumber: '',
    }
  }
}
