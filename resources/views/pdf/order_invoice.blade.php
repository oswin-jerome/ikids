<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <style>
        * {
            font-family: DejaVu Sans, sans-serif;
            box-sizing: border-box;
        }

        body {
            margin: 0;
            padding: 16px;
            font-size: 14px;
            color: #333;
        }

        .invoice-box {
            width: 100%;
        }

        .header {
            display: flex;
            justify-content: space-between;
            margin-bottom: 40px;
        }

        .company-details,
        .invoice-details {
            width: 45%;
        }

        .company-details h2 {
            margin: 0 0 10px;
            color: #4CAF50;
        }

        table {
            width: 100%;
            border-collapse: collapse;
        }

        table th,
        table td {
            padding: 12px;
            border: 1px solid #ddd;
        }

        table th {
            background-color: #f5f5f5;
            text-align: left;
        }

        .total-row td {
            font-weight: bold;
        }

        .footer {
            margin-top: 50px;
            text-align: center;
            font-size: 12px;
            color: #777;
        }
    </style>
</head>

<body>
    <div class="invoice-box">
        <div class="header">
            <div class="company-details">
                <h2>I Kids</h2>
                <p>
                    123 Business Street<br>
                    City, State, ZIP<br>
                    Email: contact@company.com<br>
                    Phone: +91 9876543210
                </p>
            </div>
            <div class="invoice-details">
                <h3>Invoice</h3>
                <p>
                    Invoice #: <strong>#{{ $order->order_id }}</strong><br>
                    Date: <strong>{{ $order->created_at->format('d M Y') }}</strong><br>
                </p>
            </div>
        </div>

        <table>
            <thead>
                <tr>
                    <th>Description</th>
                    <th>Qty</th>
                    <th>Unit Price (₹)</th>
                    <th>Total (₹)</th>
                </tr>
            </thead>
            <tbody>
                @foreach ($order->orderItems as $item)
                    <tr>
                        <td>{{ $item->product->name }}</td>
                        <td>{{ $item->quantity }}</td>
                        <td>{{ number_format($item->price, 2) }}</td>
                        <td>{{ number_format($item->quantity * $item->price, 2) }}</td>
                    </tr>
                @endforeach
                <tr class="total-row">
                    <td colspan="3" align="right">Total</td>
                    <td>₹{{ number_format($order->total_amount, 2) }}</td>
                </tr>
            </tbody>
        </table>

        <div class="footer">
            Thank you for your business!<br>
            This invoice was generated on {{ now()->format('d M Y') }}.
        </div>
    </div>
</body>

</html>
