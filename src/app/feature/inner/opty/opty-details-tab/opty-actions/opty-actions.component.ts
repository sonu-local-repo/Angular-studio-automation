import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';


@Component({
  selector: 'app-opty-actions',
  templateUrl: './opty-actions.component.html',
  styleUrls: ['./opty-actions.component.scss'],
  encapsulation : ViewEncapsulation.None,
})
export class OptyActionsComponent implements OnInit {

  public Editor= ClassicEditor;

  constructor() { }

  ngOnInit() {
  }

}
