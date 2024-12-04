import { Component, computed, OnInit } from '@angular/core';
import { NavbarComponent } from "./components/navbar/navbar.component";
import { UploadService } from './services/upload.service';
import { CarouselComponent } from "./components/carousel/carousel.component";
import { ToastComponent } from './components/toast/toast.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NavbarComponent, CarouselComponent, ToastComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'frontend';

  previewUrl: string | null = null;

  showToast = computed<boolean>(() => this.uploadService.showToast());
  
  toastType: string = 'success';
  toastText: string = '';

  file!: File;

  constructor(private uploadService: UploadService) { }
  
  ngOnInit(): void {
    this.fetchImages();
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files[0]) {
      const file = input.files[0];

      if (file.type.startsWith('image/')) {
        const reader = new FileReader();

        reader.onload = () => {
          this.previewUrl = reader.result as string;
        };

        reader.readAsDataURL(file);
        this.file = file;
      } else {
        this.displayToast("danger", "Make sure your image is JPEG/PNG and try again!")
      }
    }
  }

  uploadImage() {
    this.uploadService.uploadImage(this.file).subscribe({
      next: () => {
        this.displayToast("success", "Successfully uploaded image!");
        this.fetchImages();
      },
      error: (err) => {
        console.error("Could not upload your image: ", err);
        this.displayToast("danger", "Error uploading image!");
      }
    });
  }

  fetchImages(): void {
    this.uploadService.getImages();
  }

  displayToast(type: string, text: string) {
    this.uploadService.showToast.set(true);
    this.toastType = type;
    this.toastText = text
  }
}
