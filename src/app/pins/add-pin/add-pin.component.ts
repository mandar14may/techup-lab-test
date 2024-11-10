import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FileItem, FileLikeObject, FileUploader } from 'ng2-file-upload';
import { LocalStorageService } from '../../services/local-storage.service';


const URL = '';

@Component({
  selector: 'app-add-pin',
  templateUrl: './add-pin.component.html',
  styleUrl: './add-pin.component.scss'
})
export class AddPinComponent {

  pinForm!: FormGroup;
  customers: any[] = ['A','B','C'];
  privacyOptions = ['Public', 'Private'];

  uploader: FileUploader = new FileUploader({ url: '' });
  hasBaseDropZoneOver: boolean = false;

  constructor(
    private fb: FormBuilder,
    private localStorageService: LocalStorageService
  ) {

  }

  // Handle drag over event
  fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
    console.log(e,'fileOverDrag')
  }

  ngOnInit(): void {
    this.pinForm = this.fb.group({
      title: ['', Validators.required],
      image: ['', Validators.required],
      collaborators: [[], Validators.required],
      privacy: ['Public', Validators.required],
    });
    this.uploader.onAfterAddingFile = (fileItem) => {
      this.convertToBase64(fileItem._file).then((base64Image) => {
        this.pinForm.get('image')?.setValue(base64Image);
      });
    };
    this.loadCustomers();
  }

  // Convert image file to base64
  convertToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result as string); // base64 string
      };
      reader.onerror = reject;
      reader.readAsDataURL(file); // Convert the file to base64
    });
  }

  loadCustomers(): void {
    this.customers = this.localStorageService.getCustomers();
    console.log('customers',this.customers)
  }

  submitForm(): void {
    if (this.pinForm.valid) {
      const pinData = this.pinForm.value;
      this.localStorageService.savePin(pinData);
      console.log('Pin Data:', pinData);
      this.pinForm.reset()
      alert(`Customer Added Succefully..`)
    } else {
      console.log('Form is invalid');
    }
  }

}
