<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <style>
        body {
            margin: 0;
            font-family: Arial, sans-serif;
        }

        .label {
            width: 100mm;
            height: 150mm;
            border: 1px solid #000;
            padding: 10mm;
            box-sizing: border-box;
        }

        .section {
            margin-bottom: 10mm;
        }

        .header {
            text-align: center;
            font-size: 18pt;
            font-weight: bold;
            margin-bottom: 5mm;
        }

        .info {
            font-size: 12pt;
        }

        .barcode {
            text-align: center;
            margin-top: 15mm;
        }

        .barcode img {
            width: 80mm;
            height: auto;
        }
    </style>
</head>

<body>
    <div class="label">
        <div class="header">Shipping Label</div>

        <div class="section info">
            <strong>From:</strong><br>
            iKids Publications<br>
            123 Business Rd.<br>
            Chennai, TN 600001<br>
            Phone: +91-9876543210
        </div>

        <div class="section info">
            <strong>To:</strong><br>
            {{ $order->first_name }} {{ $order->last_name }}<br>
            {{ $order->address }}<br>
            {{ $order->city }}, {{ $order->postal_code }}<br>
            Phone: {{ $order->phone_number }}
        </div>

        <div class="section info">
            <strong>Order ID:</strong> {{ $order->order_id }}<br>
            <strong>Date:</strong> {{ $order->created_at }}<br>
            {{-- <strong>Weight:</strong> 1.2 kg --}}
        </div>

        <div class="barcode">
            <img src="https://dummyimage.com/300x80/000/fff&text=ORD123456789" alt="Barcode">
        </div>
    </div>
</body>

</html>
