exports.getPrivacyPolicy = (req, res) => {
    res.json({ title: 'Privacy Policy', content: 'Our privacy policy details...' });
};

exports.getTerms = (req, res) => {
    res.json({ title: 'Terms of Service', content: 'Terms and conditions...' });
};

exports.getAbout = (req, res) => {
    res.json({ title: 'About ETHREE', content: 'Vijayawada\'s premier open-air family hub...' });
};
