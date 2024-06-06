import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CheckoutService } from '../services/checkout.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  checkoutForm: FormGroup;
  addressForm: FormGroup;
  paymentForm: FormGroup;
  step = 1;
  orderSummary: any;
  orderResponse: any;

  constructor(private fb: FormBuilder, private checkoutService: CheckoutService, private router: Router) {
    this.checkoutForm = this.fb.group({
      address: this.fb.group({
        country: ['', Validators.required],
        street1: ['', Validators.required],
        street2: [''],
        city: ['', Validators.required],
        state: ['', Validators.required],
        zip: ['', Validators.required]
      }),
      payment: this.fb.group({
        cardNumber: ['', Validators.required],
        expirationMonth: ['', Validators.required],
        expirationYear: ['', Validators.required],
        cvv: ['', Validators.required]
      })
    });

    this.addressForm = this.checkoutForm.get('address') as FormGroup;
    this.paymentForm = this.checkoutForm.get('payment') as FormGroup;
  }

  // constructor(private fb: FormBuilder, private checkoutService: CheckoutService, private router: Router) {
  //   this.checkoutForm = this.fb.group({
  //       country: ['', Validators.required],
  //       street1: ['', Validators.required],
  //       street2: [''],
  //       city: ['', Validators.required],
  //       state: ['', Validators.required],
  //       zip: ['', Validators.required],
  //       cardNumber: ['', Validators.required],
  //       expiryDate: ['', Validators.required],
  //       cvv: ['', Validators.required]
  //   });
  // }

  ngOnInit(): void { }

  nextStep() {
    if (this.step < 3) {
      this.step++;
    } else {
      this.onSubmit();
    }
  }

  previousStep() {
    if (this.step > 1) {
      this.step--;
    }
  }

  onSubmit(): void {
    if (this.checkoutForm.invalid) {
      return;
    }

    console.log(this.checkoutForm.value);
    

    this.checkoutService.placeOrder(this.checkoutForm.value).subscribe(
      response => {
        this.orderResponse = response;
        console.log("order places sucessfully");

      },
      error => {
        console.error('Error placing order', error);
        this.orderResponse = { message: 'Error placing order', error: error.error };
      }
    );
  }
}
