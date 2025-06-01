import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Order } from '@/types';
import { useForm } from '@inertiajs/react';
import { CheckCircle, Clock, RefreshCw, Save, Truck, X } from 'lucide-react';
const statusConfig = {
    pending: { label: 'Pending', color: 'bg-yellow-100 text-yellow-800', icon: <Clock className="h-3 w-3" /> },
    processing: { label: 'Processing', color: 'bg-purple-100 text-purple-800', icon: <RefreshCw className="h-3 w-3" /> },
    shipped: { label: 'Shipped', color: 'bg-indigo-100 text-indigo-800', icon: <Truck className="h-3 w-3" /> },
    completed: { label: 'Completed', color: 'bg-blue-100 text-blue-800', icon: <CheckCircle className="h-3 w-3" /> },
    cancelled: { label: 'Cancelled', color: 'bg-red-100 text-red-800', icon: <X className="h-3 w-3" /> },
};
const UpdateOrder = ({ order_id, onClose, order }: { order_id: number; onClose: () => void; order: Order }) => {
    const { data, setData, errors, post } = useForm({
        status: '',
        description: '',
    });

    const handleStatusUpdate = () => {
        post(route('admin.orders.update.status', order_id), {
            onSuccess: () => {
                onClose();
            },
        });
    };

    return (
        <Card className="border-blue-200 bg-blue-50">
            <CardHeader>
                <CardTitle className="text-lg">Update Order Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <Label htmlFor="status">New Status</Label>
                        <Select defaultValue={order.status} onValueChange={(value) => setData('status', value)}>
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                {Object.entries(statusConfig).map(([key, config]) => (
                                    <SelectItem key={key} value={key}>
                                        <div className="flex items-center gap-2">
                                            {config.icon}
                                            {config.label}
                                        </div>
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <InputError message={errors.status} />
                    </div>
                </div>
                <div>
                    <Label htmlFor="note">Status Note (Optional)</Label>
                    <Textarea
                        id="note"
                        value={data.description}
                        onChange={(e) => setData('description', e.target.value)}
                        placeholder="Add a note about this status change..."
                        rows={3}
                    />
                    <InputError message={errors.description} />
                </div>
                <div className="flex gap-2">
                    <Button onClick={handleStatusUpdate}>
                        <Save className="mr-2 h-4 w-4" />
                        Update Status
                    </Button>
                    {/* <Button variant="outline" onClick={cancelStatusEdit}>
                        Cancel
                    </Button> */}
                </div>
            </CardContent>
        </Card>
    );
};

export default UpdateOrder;
