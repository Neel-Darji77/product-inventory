const StatCard = ({
    title,
    value,
    subtitle
}) => {
    return (
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md">
            <p className="text-sm font-medium text-gray-500">
                {title}
            </p>
            <h2 className="mt-3 text-4xl font-bold text-gray-900">
                {value}
            </h2>
            {subtitle && (
                <p className="mt-2 text-sm text-gray-500">
                    {subtitle}
                </p>
            )}
        </div>
    );
};

export default StatCard;