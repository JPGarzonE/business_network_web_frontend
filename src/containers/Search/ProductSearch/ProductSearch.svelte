<script>
    import Magnify from "svelte-material-icons/Magnify.svelte";
    
    export let searchResults = [];

    searchResults = [
        {
            "category": "Aguacates",
            "elements": [
                {
                    "name": "Aguacate Pinkerton",
                    "images": [
                        {
                            "path": "https://business-network-profile-images.s3.amazonaws.com/procelas/151/151.png?AWSAccessKeyId=AKIA4BR2HNWAP3TUWE6C&Signature=6NbHmVfXtXxRgeIoZO5yTZBec1U%3D&Expires=1602709216"
                        }
                    ],
                    "company": {
                        "name": "JGB"
                    }
                },
                {
                    "name": "Aguacate Criollo",
                    "images": [
                        {
                            "path": "https://business-network-profile-images.s3.amazonaws.com/procelas/152/152.png?AWSAccessKeyId=AKIA4BR2HNWAP3TUWE6C&Signature=L1L0c7XcVfhGVhtRc%2Frjf286oqI%3D&Expires=1602709217"
                        }
                    ],
                    "company": {
                        "name": "Chippy"
                    }
                },
                {
                    "name": "Aguacate Hass",
                    "images": [
                        {
                            "path": "https://business-network-profile-images.s3.amazonaws.com/procelas/149/149.png?AWSAccessKeyId=AKIA4BR2HNWAP3TUWE6C&Signature=V9KXL7FUCI4fhcxwlFEiCX8RHB4%3D&Expires=1602709217"
                        }
                    ],
                    "company": {
                        "name": "Agroaguacate"
                    }
                },
                {
                    "name": "Aguacate Pinkerton",
                    "images": [
                        {
                            "path": "https://business-network-profile-images.s3.amazonaws.com/procelas/150/150.png?AWSAccessKeyId=AKIA4BR2HNWAP3TUWE6C&Signature=2%2BLUX42Nea7UJnkC3d2kqw9RoUw%3D&Expires=1602709217"
                        }
                    ],
                    "company": {
                        "name": "Agroaguacate"
                    }
                },
                {
                    "name": "Aguacate Criollo",
                    "images": [
                        {
                            "path": "https://business-network-profile-images.s3.amazonaws.com/procelas/152/152.png?AWSAccessKeyId=AKIA4BR2HNWAP3TUWE6C&Signature=L1L0c7XcVfhGVhtRc%2Frjf286oqI%3D&Expires=1602709217"
                        }
                    ],
                    "company": {
                        "name": "Chippy"
                    }
                },
            ]
        },
        {
            "category": "Aguacates 2",
            "elements": [
                {
                    "name": "Aguacate Pinkerton",
                    "images": [
                        {
                            "path": "https://business-network-profile-images.s3.amazonaws.com/procelas/151/151.png?AWSAccessKeyId=AKIA4BR2HNWAP3TUWE6C&Signature=6NbHmVfXtXxRgeIoZO5yTZBec1U%3D&Expires=1602709216"
                        }
                    ],
                    "company": {
                        "name": "JGB"
                    }
                },
                {
                    "name": "Aguacate Criollo",
                    "images": [
                        {
                            "path": "https://business-network-profile-images.s3.amazonaws.com/procelas/152/152.png?AWSAccessKeyId=AKIA4BR2HNWAP3TUWE6C&Signature=L1L0c7XcVfhGVhtRc%2Frjf286oqI%3D&Expires=1602709217"
                        }
                    ],
                    "company": {
                        "name": "Chippy"
                    }
                },
                {
                    "name": "Aguacate Hass",
                    "images": [
                        {
                            "path": "https://business-network-profile-images.s3.amazonaws.com/procelas/149/149.png?AWSAccessKeyId=AKIA4BR2HNWAP3TUWE6C&Signature=V9KXL7FUCI4fhcxwlFEiCX8RHB4%3D&Expires=1602709217"
                        }
                    ],
                    "company": {
                        "name": "Agroaguacate"
                    }
                },
                {
                    "name": "Aguacate Pinkerton",
                    "images": [
                        {
                            "path": "https://business-network-profile-images.s3.amazonaws.com/procelas/150/150.png?AWSAccessKeyId=AKIA4BR2HNWAP3TUWE6C&Signature=2%2BLUX42Nea7UJnkC3d2kqw9RoUw%3D&Expires=1602709217"
                        }
                    ],
                    "company": {
                        "name": "Agroaguacate"
                    }
                },
                {
                    "name": "Aguacate Criollo",
                    "images": [
                        {
                            "path": "https://business-network-profile-images.s3.amazonaws.com/procelas/152/152.png?AWSAccessKeyId=AKIA4BR2HNWAP3TUWE6C&Signature=L1L0c7XcVfhGVhtRc%2Frjf286oqI%3D&Expires=1602709217"
                        }
                    ],
                    "company": {
                        "name": "Chippy"
                    }
                },
            ]
        }
    ]

    let searchQuery = '';
</script>

<style>
    .ProductSearch {
        display: flex;
        width: 90%;
        height: 50px;
        margin: 20px;
    }

    .ProductSearch-icon, .ProductSearch-input {
        border: 1px solid #999999;
        background-color: #f5f5f5;
    }

    .ProductSearch-icon {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 5em;
        border-right: unset;
    }

    .ProductSearch-input {
        width: 100%;
        border-left: unset;
    }

    @media screen and (min-width: 480px) {
        .ProductSearch {
            width: 80%;
        }
    }

    @media screen and (min-width: 680px) {
        .ProductSearch {
            width: 60%;
        }
    }

    @media screen and (min-width: 950px) {
        .ProductSearch {
            width: 42%;
        }
    }
</style>

<div class="ProductSearch">
    <div class="ProductSearch-icon">
        <Magnify size="70%" color="#999999" />
    </div>
    <input type="text" name="ProductSearch-input" class="ProductSearch-input" 
        bind:value={searchQuery} />
</div>