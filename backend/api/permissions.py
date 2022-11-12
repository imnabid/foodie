from rest_framework.permissions import BasePermission, SAFE_METHODS, IsAuthenticated

class IsStaffOrReadOnly(BasePermission):
    def has_permission(self, request, view):
        return (
            request.method in SAFE_METHODS or
            request.user.is_staff
        )
class IsAuthenticatedOrReadOnly(BasePermission):
    def has_permission(self, request, view):
        return (
            request.method in SAFE_METHODS or
            request.user
        )
class IsStaff(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_staff

class IsInstanceOfUser(BasePermission):
    def has_object_permission(self, request, view, obj):
        return obj.user == request.user

class IsPaymentSuccessful(BasePermission):
    def has_permission(self, request, view):
        
        return (
            request.method in SAFE_METHODS or
            request.user.is_staff
        )