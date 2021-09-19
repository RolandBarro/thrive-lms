import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

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

  constructor() { }

  ngOnInit(): void {
  }

  onBtnClick(action: string) {
    this.saveUser.emit(this.user)
  }

}
