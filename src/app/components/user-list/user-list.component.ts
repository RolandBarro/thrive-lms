import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserListComponent implements OnInit {
  @Input() users: any[] = [];
  @Output() eventAction = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  onClickEvent(event: string, index: number | null = null ) {
    this.eventAction.emit({ event, index });
  }

}
