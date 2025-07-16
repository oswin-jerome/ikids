<?php

namespace App\Services;

use App\Models\Order;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Response;

class PdfGeneratorService
{

	public function generateOrderInvoice(Order $order, $exportType = "stream"): Response
	{
		$pdf = Pdf::loadView('pdf.order_invoice', [
			"order" => $order,
		]);

		return $pdf->stream('invoice_' . $order->order_id . '.pdf');
	}
}
