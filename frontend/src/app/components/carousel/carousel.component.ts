import { Component, computed } from '@angular/core';
import { UploadService } from '../../services/upload.service';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.css'
})
export class CarouselComponent {

  images = computed<any>(() => this.uploadService.fetchedImages());

  constructor(private uploadService: UploadService) {}
}
