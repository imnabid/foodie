
from django.conf import settings
from django.contrib import admin
from django.urls import path, include
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),
    # path('api-auth/', include('rest_framework.urls'))
    path('auth/', include('drf_social_oauth2.urls', namespace='drf')),
    path('accounts/',include('accounts.urls'))
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

