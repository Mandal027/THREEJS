import React from 'react';

// Sample alumni data
const alumniData = [
    {
        name: 'John Doe',
        year: '2015',
        achievements: 'Exhibited at National Art Gallery, Winner of XYZ Art Competition',
        bio: 'John Doe is a renowned painter known for his abstract art. He has exhibited his work in various national and international galleries.'
    },
    {
        name: 'Jane Smith',
        year: '2017',
        achievements: 'Published in Art Magazine, Solo Exhibition at ABC Gallery',
        bio: 'Jane Smith specializes in contemporary art. Her work has been featured in several art magazines and she has held solo exhibitions.'
    },
    {
        name: 'Emily Johnson',
        year: '2019',
        achievements: 'Artist in Residence at DEF Studio, Featured in Art Fair',
        bio: 'Emily Johnson is an emerging artist with a focus on modern art. She has been an artist in residence and her work has been showcased in art fairs.'
    },

    // add 4 more person data 
{
    name: 'Michael Brown',
    year: '2016',
    achievements: 'Winner of ABC Art Award, Exhibited at XYZ Gallery',
    bio: 'Michael Brown is known for his innovative approach to sculpture. He has won several awards and his work has been exhibited in prominent galleries.'
},
{
    name: 'Sarah Davis',
    year: '2018',
    achievements: 'Featured in Art Journal, Group Exhibition at LMN Gallery',
    bio: 'Sarah Davis is a contemporary artist whose work explores themes of identity and culture. She has been featured in art journals and group exhibitions.'
},
{
    name: 'David Wilson',
    year: '2020',
    achievements: 'Residency at GHI Studio, Solo Exhibition at JKL Gallery',
    bio: 'David Wilson is an emerging artist with a focus on digital art. He has completed residencies and held solo exhibitions showcasing his unique style.'
},
{
    name: 'Laura Martinez',
    year: '2021',
    achievements: 'Winner of DEF Art Prize, Exhibited at MNO Gallery',
    bio: 'Laura Martinez is a painter known for her vibrant and expressive works. She has won art prizes and her paintings have been exhibited in various galleries.'
}
];

// Alumni component
const Alumni = () => {
    return (
        <div className="max-w-6xl mx-4 mt-1 px-6 py-12 rounded-lg shadow-md overflow-y-auto max-h-screen">
            <h1 className="text-4xl font-bold text-center mb-8 text-orange-600">Painting Wing Alumni</h1>
            <div className="space-y-8">
                {alumniData.map((alumni, index) => (
                    <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                        <h2 className="text-2xl font-semibold text-gray-800">{alumni.name}</h2>
                        <p className="text-gray-500"><strong>Year:</strong> {alumni.year}</p>
                        <p className="text-gray-500"><strong>Achievements:</strong> {alumni.achievements}</p>
                        <p className="text-gray-500"><strong>Bio:</strong> {alumni.bio}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Alumni;
