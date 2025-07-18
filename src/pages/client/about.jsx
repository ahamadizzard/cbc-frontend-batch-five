import TeamMemberCard from "../../components/teamMemberCard";
export default function About() {
    const teamMembers = [
        {
            id: 1,
            name: 'Alex Johnson',
            role: 'Founder & CEO',
            bio: 'Visionary leader with 10+ years of industry experience.',
            image: '/images/team/alex.jpg'
        },
        {
            id: 2,
            name: 'Sam Wilson',
            role: 'Lead Developer',
            bio: 'Full-stack wizard passionate about clean code.',
            image: '/images/team/sam.jpg'
        },
        {
            id: 3,
            name: 'Taylor Smith',
            role: 'Design Director',
            bio: 'Creates beautiful, user-centered experiences.',
            image: '/images/team/taylor.jpg'
        }
    ];

    return (
        <div className="min-h-screen bg-background">
            {/* Hero Section */}
            <section className="relative py-20 bg-accent text-white">
                <div className="container mx-auto px-6 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Story</h1>
                    <p className="text-xl max-w-3xl mx-auto">
                        Building innovative solutions with passion and purpose since 2018.
                    </p>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-16 bg-secondary/20"></div>
            </section>

            {/* Mission Section */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col md:flex-row items-center">
                        <div className="md:w-1/2 mb-10 md:mb-0 md:pr-10">
                            <h2 className="text-3xl font-bold text-primary mb-6">Our Mission</h2>
                            <p className="text-lg text-gray-700 mb-6">
                                We're dedicated to creating exceptional digital experiences that solve real problems
                                and delight users. Our team combines technical expertise with creative vision to
                                deliver solutions that make a difference.
                            </p>
                            <button className="px-6 py-3 bg-accent text-white rounded-lg hover:bg-accent/90 transition-colors">
                                Learn More
                            </button>
                        </div>
                        <div className="md:w-1/2">
                            <div className="bg-secondary/10 p-8 rounded-xl border-l-4 border-accent">
                                <h3 className="text-2xl font-semibold text-accent mb-4">Core Values</h3>
                                <ul className="space-y-4">
                                    <li className="flex items-start">
                                        <span className="text-accent mr-2">✓</span>
                                        <span className="text-accent">User-centered design</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-accent mr-2">✓</span>
                                        <span className="text-accent">Technical excellence</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-accent mr-2">✓</span>
                                        <span className="text-accent">Transparent communication</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-accent mr-2">✓</span>
                                        <span className="text-accent">Continuous improvement</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="py-16 bg-background">
                <div className="container mx-auto px-6">
                    <h2 className="text-3xl font-bold text-center text-accent mb-12">Meet Our Team</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {teamMembers.map(member => (
                            <TeamMemberCard
                                key={member.id}
                                name={member.name}
                                role={member.role}
                                bio={member.bio}
                                image={member.image}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-16 bg-secondary text-white">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                        <div className="p-6">
                            <h3 className="text-5xl font-bold mb-2">500+</h3>
                            <p className="text-xl">Satisfied Customers</p>
                        </div>
                        <div className="p-6">
                            <h3 className="text-5xl font-bold mb-2">100%</h3>
                            <p className="text-xl">Client Satisfaction</p>
                        </div>
                        <div className="p-6">
                            <h3 className="text-5xl font-bold mb-2">24/7</h3>
                            <p className="text-xl">Support Available</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}