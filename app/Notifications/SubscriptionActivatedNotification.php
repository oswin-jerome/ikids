<?php

namespace App\Notifications;

use App\Models\Subscription;
use Carbon\Carbon;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class SubscriptionActivatedNotification extends Notification
{
    use Queueable;

    /**
     * Create a new notification instance.
     */
    public function __construct(protected Subscription $subscription)
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
        $productName = $this->subscription->subscribableProduct->name; // e.g., "Monthly Kids Book Box"
        $endDate = Carbon::parse($this->subscription->end_date)->format('F j, Y'); // e.g., "August 18, 2025"

        return (new MailMessage)
            ->subject('Your Subscription is Now Active!')
            ->greeting('Hello ' . $notifiable->name . ',')
            ->line("We're excited to let you know that your subscription for **{$productName}** is now active.")
            ->line("Your subscription is valid until **{$endDate}**.")
            ->line('You’ll continue to receive your items as scheduled. We hope you enjoy them!')
            ->action('Manage Your Subscription', url('/subscriptions'))
            ->line('Thank you for choosing us!');
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
