const config = {
    app_name: 'Anthropophobia Rarity',
    app_description: 'Anthropophobia Viruses rarity score calculation base on the ERC721 smart contract and the NFT metadata.',
    collection_file_name: 'b2c1-collection.json',
    collection_contract_address: 'matic/0xc06fd77c1aec4dccefc2fe6b3649ec454585fb15',
    collection_name: 'Anthropophobia Viruses',
    collection_description: 'A programmatically generated NFT collection that contains twelve thousand (12k) unique Abstract Scribbles of the Anthropophobia Viruses. Each one is verified unique and live on Polygon (Matic) blockchain network.',
    collection_id_from: 1,
    ignore_traits: ['date'], 
    sqlite_file_name: 'database.sqlite',
    ga: '',
    main_og_image: 'https://user-images.githubusercontent.com/32818033/137112728-7966939c-52cf-41e0-8878-481053e6bacf.png',
    item_path_name: 'virus',
    page_item_num: 24,
    content_image_is_video: false,
    content_image_frame: 'circle', // circle, rectangle
    use_wallet: false
};

module.exports = config;