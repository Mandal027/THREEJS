import React, { useState, useEffect } from 'react';

// Painting Wing Club Members
const members = [
    { id: 1, name: 'Alice', role: 'Painter', bio: 'Alice specializes in abstract and portrait paintings that evoke deep emotions.' },
    { id: 2, name: 'Bob', role: 'Sculptor', bio: 'Bob is a talented sculptor who works with a variety of materials including clay and metal.' },
    { id: 3, name: 'Charlie', role: 'Illustrator', bio: 'Charlie brings stories to life through detailed and imaginative illustrations.' },
    { id: 4, name: 'David', role: 'Painter', bio: 'David’s vibrant landscape paintings capture the beauty of nature.' },
    { id: 5, name: 'Eve', role: 'Sculptor', bio: 'Eve creates intricate sculptures inspired by modern art movements.' },
    { id: 6, name: 'Frank', role: 'Illustrator', bio: 'Frank’s illustrations have been featured in magazines and children’s books.' },
    { id: 7, name: 'Grace', role: 'Painter', bio: 'Grace is known for her surrealistic paintings that challenge perceptions of reality.' },
    { id: 8, name: 'Hank', role: 'Sculptor', bio: 'Hank’s sculptures focus on themes of identity and human expression.' },
    { id: 9, name: 'Ivy', role: 'Illustrator', bio: 'Ivy specializes in digital illustrations for web and mobile applications.' },
    { id: 10, name: 'Jack', role: 'Painter', bio: 'Jack’s watercolor paintings are admired for their soft, flowing colors.' },
    { id: 11, name: 'Kathy', role: 'Sculptor', bio: 'Kathy’s sculpting work often explores the relationship between humans and technology.' },
    { id: 12, name: 'Leo', role: 'Illustrator', bio: 'Leo enjoys creating comic-style illustrations that captivate audiences.' },
    { id: 13, name: 'Mona', role: 'Painter', bio: 'Mona’s paintings reflect her passion for cultural heritage and traditions.' },
    { id: 14, name: 'Nina', role: 'Sculptor', bio: 'Nina’s sculptures often explore themes of strength and resilience.' },
    { id: 15, name: 'Oscar', role: 'Illustrator', bio: 'Oscar’s whimsical illustrations add a playful touch to any project.' },
    { id: 16, name: 'Paul', role: 'Painter', bio: 'Paul’s artwork focuses on urban landscapes and modern life.' },
    { id: 17, name: 'Quinn', role: 'Sculptor', bio: 'Quinn enjoys creating large-scale sculptures for public spaces.' },
    { id: 18, name: 'Rita', role: 'Illustrator', bio: 'Rita specializes in botanical illustrations with a scientific touch.' },
    { id: 19, name: 'Sam', role: 'Painter', bio: 'Sam’s bold and expressive paintings make a strong visual impact.' },
    { id: 20, name: 'Tina', role: 'Sculptor', bio: 'Tina creates sculptures that explore themes of nature and sustainability.' }
];

const Members = () => {
    const [contentVisible, setContentVisible] = useState(false);

    useEffect(() => {
        // Trigger entrance animation
        setContentVisible(true);
    }, []);

    return (
        <div className={`max-w-6xl w-3/4  mx-1 mt-1 px-4 sm:px-6 lg:px-8 py-12 rounded-lg overflow-y-auto max-h-screen transition-opacity duration-500 ease-out ${contentVisible ? 'opacity-100' : 'opacity-0'}`}>
            <h2 className="text-4xl font-bold text-orange-600 text-center mb-8">Painting Wing Club Members</h2>
            <p className="text-lg text-gray-700 mb-10 text-center">
                Welcome to the Painting Wing Club! Our members are a diverse group of talented individuals specializing in various art forms. 
                From painters to sculptors and illustrators, each member brings their unique perspective and creativity to our community.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {members.map(member => (
                    <div key={member.id} className="bg-orange-100 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                        <h3 className="text-2xl font-semibold text-gray-800 mb-2">{member.name}</h3>
                        <p className="text-lg text-gray-600 mb-4"><strong>Role:</strong> {member.role}</p>
                        <p className="text-gray-700">{member.bio}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Members;
