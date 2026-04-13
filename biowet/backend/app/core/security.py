from enum import StrEnum

from collections.abc import Callable

from fastapi import Depends, Header, HTTPException, status


class UserRole(StrEnum):
    CITIZEN = "citizen"
    RESEARCHER = "researcher"
    ADMIN = "admin"
    AGENCY_PRO = "agency_pro"


def get_current_role(x_role: str | None = Header(default=None, alias="X-Role")) -> UserRole:
    try:
        return UserRole(x_role or UserRole.CITIZEN)
    except ValueError as exc:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid role provided in X-Role header.",
        ) from exc


def require_roles(*required: UserRole) -> Callable[[UserRole], UserRole]:
    """Return a dependency that validates user role membership."""

    def _guard(role: UserRole = Depends(get_current_role)) -> UserRole:
        if role not in set(required):
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Insufficient permissions for this endpoint.",
            )
        return role

    return _guard
