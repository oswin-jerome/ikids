<?php

namespace App\Notifications;

use App\Models\Order;
use App\Models\Subscription;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class SubscriptionOrderPlacedNotification extends Notification implements ShouldQueue
{
    use Queueable;

    /**
     * Create a new notification instance.
     */
    public function __construct(protected Subscription $subscription, protected Order $order)
    {
        //
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        $order = $this->order;
        $subscription = $this->subscription;

        $productName = $subscription->subscribableProduct->name;
        $orderId = $order->order_id;          // e.g., "#ORD12345"

        return (new MailMessage)
            ->subject('Your Subscription Order Has Been Placed')
            ->greeting('Hello ' . $notifiable->name . ',')
            ->line("Your subscription order **{$orderId}** for **{$productName}** has been successfully placed as part of your subscription **{$subscription->subscription_id}**")
            ->line("You can track your order or manage your subscription anytime.")
            ->action('View Order', url("/orders/{$orderId}"))
            ->line('Thank you for being a valued subscriber!');
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            //
        ];
    }
}
