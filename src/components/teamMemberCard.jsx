export default function TeamMemberCard({ name, role, bio, image }) {
    return (
        <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <div className="h-48 bg-primary/10 flex items-center justify-center">
                {image ? (
                    <img
                        src={image}
                        alt={name}
                        className="h-full w-full object-cover"
                    />
                ) : (
                    <div className="text-primary text-6xl font-bold">
                        {name.charAt(0)}
                    </div>
                )}
            </div>
            <div className="p-6">
                <h3 className="text-xl font-bold text-primary">{name}</h3>
                <p className="text-accent mb-3">{role}</p>
                <p className="text-gray-600">{bio}</p>
            </div>
        </div>
    );
}