import { Component, computed, Input } from '@angular/core';
import { UploadService } from '../../services/upload.service';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.css'
})
export class ToastComponent {

  showToast = computed<boolean>(() => this.uploadService.showToast());

  constructor(private uploadService: UploadService) {}
  
  @Input('text') text!: string;
  @Input('type') type!: string;

  dismissToast() {
    this.uploadService.showToast.set(false);
  }
  
}
