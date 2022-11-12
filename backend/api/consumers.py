from channels.generic.websocket import JsonWebsocketConsumer
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync
from api.models import Order
from api.serializers import OwnerOrderListSerializer
class OrderListConsumer(JsonWebsocketConsumer):

    def connect(self):
        self.accept()
        self.current_status = None
        async_to_sync(self.channel_layer.group_add)('order-list',self.channel_name)

    def receive(self, text_data=None, bytes_data=None, **kwargs):
        self.current_status = text_data
        queryset = Order.objects.filter(cancelled=False, status=text_data).order_by('date')
        serializer = OwnerOrderListSerializer(queryset, many=True)
        payload = {
            'OT':Order.objects.filter(cancelled=False, status='OT').count(),
            'P':Order.objects.filter(cancelled=False, status='P').count(),
            'S':Order.objects.filter(cancelled=False, status='S').count(),
            'data':serializer.data
        }
        self.send_json(payload)
    
    def disconnect(self, close_code):
        async_to_sync(self.channel_layer.group_discard)("order-list", self.channel_name)

    
    def order_list(self, event):
        status = event.get('status')
        if status == self.current_status:
            queryset = Order.objects.filter(cancelled=False, status=status).order_by('date')
        else:
            queryset = Order.objects.filter(cancelled=False, status=self.current_status).order_by('date')
        
        serializer = OwnerOrderListSerializer(queryset, many=True)
        payload = {
            'OT':Order.objects.filter(cancelled=False, status='OT').count(),
            'P':Order.objects.filter(cancelled=False, status='P').count(),
            'S':Order.objects.filter(cancelled=False, status='S').count(),
            'data':serializer.data
        }
        self.send_json(payload)

