<?php

namespace App\Services;

use Razorpay\Api\Api;

class RazorpayService
{
	protected Api $api;

	public function __construct()
	{
		$this->api = new Api(config('services.razorpay.key'), config('services.razorpay.secret'));
	}

	public function createOrder(array $data)
	{
		return $this->api->order->create($data);
	}
}
