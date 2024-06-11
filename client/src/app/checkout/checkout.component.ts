import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CheckoutService } from '../services/checkout.service';
import { Router } from '@angular/router';
import { CartService } from '../services/cart.service';

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

  orderItems: any[] = [];
  totalPrice: number = 0;
  error: string | null = null;


  months: number[] = [];
  years: number[] = [];

  constructor(private fb: FormBuilder, private checkoutService: CheckoutService, private router: Router, private cartService: CartService) {
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

  ngOnInit() {
    this.loadCart();
    this.months = Array.from({ length: 12 }, (_, i) => i + 1);

    const currentYear = new Date().getFullYear();
    for (let i = 0; i < 10; i++) {
      this.years.push(currentYear + i);
    }
  }

  loadCart(): void {
    this.cartService.getCart().subscribe(
      data => {
        this.orderItems = data.items;
        this.calculateTotal();
      },
      err => {
        this.error = err.error.message;
      }
    );
  }

  calculateTotal(): void {
    this.totalPrice = this.orderItems.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  }

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
