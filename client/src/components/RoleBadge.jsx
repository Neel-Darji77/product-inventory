const roleClasses = {
    admin: "bg-red-100 text-red-700",
    manager: "bg-blue-100 text-blue-700",
    viewer: "bg-gray-100 text-gray-700"
};

const RoleBadge = ({ role }) => {
    return (
        <span
            className={`rounded-full px-3 py-1 text-xs font-medium ${roleClasses[role]}`}
        >
            {role}
        </span>
    );
};

export default RoleBadge;