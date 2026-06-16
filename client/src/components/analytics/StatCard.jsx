const StatCard = ({
    title,
    value,
    subtitle
}) => {
    return (
        <div className="rounded-2xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm transition hover:shadow-md">
            <p className="text-sm font-medium text-gray-500 dark:text-slate-400">
                {title}
            </p>
            <h2 className="mt-3 text-4xl font-bold text-gray-900 dark:text-slate-100">
                {value}
            </h2>
            {subtitle && (
                <p className="mt-2 text-sm text-gray-500 dark:text-slate-400">
                    {subtitle}
                </p>
            )}
        </div>
    );
};

export default StatCard;