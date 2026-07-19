import React from 'react';
import { useTranslation } from 'react-i18next';

function Footer () {
    const { t } = useTranslation();
    
    return (
        <footer className="bg-gray-50 dark:bg-gray-800 shadow-sm py-3 sm:py-4 mt-6 border-t border-gray-200 dark:border-gray-700 transition-colors">
            <div className="container mx-auto px-4 sm:px-6">
                <div className="flex justify-center">
                    <span className="text-gray-600 dark:text-gray-400 text-sm sm:text-base transition-colors">
                        {t('footerText') || 'Itransition, Inna Zamzhytskaya, 2026'}
                    </span>
                </div>
            </div>
        </footer>
    );
}

export default Footer;