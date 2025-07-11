from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import ( login, register, ProductoViewSet, MarcaViewSet, CategoriaViewSet, SolicitudesViewSet
)

router = DefaultRouter()

router.register(r'productos', ProductoViewSet, basename='producto')
router.register(r'marcas', MarcaViewSet, basename='marca')
router.register(r'categorias', CategoriaViewSet, basename='categoria')
router.register(r'solicitudes', SolicitudesViewSet, basename='solicitud')

urlpatterns = [
    path('', include(router.urls)),
    path('auth/login/', login, name='login'),
    path('auth/register/', register, name='register'),
    path('auth/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('auth/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('productos/eliminar-producto/', ProductoViewSet.as_view({'delete': 'eliminar_producto'}), name='eliminar_producto'),
    path('productos/actualizar-producto/', ProductoViewSet.as_view({'put': 'actualizar_producto'}), name='actualizar_producto'),
    path('productos/marcas/', MarcaViewSet.as_view({'get': 'marcas'}), name='marcas'),
    path('productos/categorias/', CategoriaViewSet.as_view({'get': 'categorias'}), name='categorias'),
    path('productos/agregar-marca/', MarcaViewSet.as_view({'post': 'agregar_marca'}), name='agregar_marca'),
    path('productos/agregar-categoria/', CategoriaViewSet.as_view({'post': 'agregar_categoria'}), name='agregar_categoria'),
]

