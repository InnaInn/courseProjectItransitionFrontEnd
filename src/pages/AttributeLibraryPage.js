import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import editImg from '../images/editIcon.png';
import addImg from '../images/addIcon.png';
import deleteImg from '../images/deleteIcon.png';

function AttributeLibraryPage() {
    const attributes = [
        {
            id: 1,
            category: 'Domain',
            name: 'Java',
            type: 'Text Input',
            possibleValues: 'Junior'
        },
        {
            id: 2,
            category: 'Domain',
            name: 'JS',
            type: 'Textarea',
            possibleValues: 'Junior'
        },
        {
            id: 3,
            category: 'Domain',
            name: 'React',
            type: 'Input',
            possibleValues: 'Senior'
        },
        {
            id: 4,
            category: 'Domain',
            name: 'CSS',
            type: 'Number',
            possibleValues: 'Middle'
        }

    ];

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
            <Header />
            <div className="flex-grow container mx-auto px-4 py-6">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                            <button className="hover:opacity-70 transition-opacity">
                                <img src={addImg} alt="Add" className="w-8 h-8" />
                            </button>
                            <button className="hover:opacity-70 transition-opacity">
                                <img src={editImg} alt="Edit" className="w-8 h-8" />
                            </button>
                            <button className="hover:opacity-70 transition-opacity">
                                <img src={deleteImg} alt="Delete" className="w-8 h-8" />
                            </button>
                        </div>
                        <div className="flex items-center gap-3">
                            <input
                                type="text"
                                placeholder="Filter..."
                                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
                            />
                        </div>
                    </div>
                    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50 border-b border-gray-200">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-12">
                                            <input
                                                type="checkbox"
                                                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                            />
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Category
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Name
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Field Type
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Possible Values
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {attributes.map((attr) => (
                                        <tr key={attr.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4 text-sm text-gray-700 text-left">
                                                <input
                                                    type="checkbox"
                                                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                                />
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-700 text-left">
                                                {attr.category}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-700 text-left">
                                                {attr.name}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-700 text-left">
                                                <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded-md text-xs font-medium">
                                                    {attr.type}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-500 text-left">
                                                {attr.possibleValues}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>
            </div>
            <Footer />
        </div>
    );
}

export default AttributeLibraryPage;