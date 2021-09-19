import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserFormComponent implements OnInit {
  @Input() methodType: string = 'add';
  @Input() user: any = {};
  @Output() saveUser = new EventEmitter<any>();

  constructor(
    private bsModalRef: BsModalRef,
  ) { }

  ngOnInit(): void {
  }

  onBtnClick(action: string) {
    this.saveUser.emit(this.user)
  }

  closeForm() {
    this.bsModalRef.hide();
  }

}
