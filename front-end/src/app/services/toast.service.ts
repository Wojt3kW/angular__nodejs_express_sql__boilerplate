import { HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  public constructor(private toastr: ToastrService) {}

  public showSuccess(message: string, title: string = 'Success'): void {
    this.toastr.success(message, title);
  }

  public showError(message: string, title: string = 'Error!'): void {
    this.toastr.error(message, title, {
      timeOut: 5000,
      closeButton: true,
      disableTimeOut: true,
    });
  }

  public showResponseMessage(response: any): void {
    if (
      response?.status === HttpStatusCode.Ok ||
      response?.status === HttpStatusCode.Created
    ) {
      this.showSuccess(response?.message ?? 'Operation completed successfully');
    } else {
      this.showError(
        response?.message ?? 'An error occurred while processing your request'
      );
    }
  }

  public showErrorMessage(error: any): void {
    const message =
      error?.error?.message ||
      error?.message ||
      'An error occurred while processing your request';
    this.showError(message);
  }
}
