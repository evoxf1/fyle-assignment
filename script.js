// app.js
$(document).ready(function() {
    let username = 'evoxf1'; // Default GitHub username
    let perPage = 30;
    let currentPage = 1;
    let repositories = [];

    function fetchRepositories() {
        $('#loader').show();

        const apiUrl = `https://api.github.com/users/${username}/repos?page=${currentPage}&per_page=${perPage}`;

        $.get(apiUrl, function(repo) {
            $('#loader').hide();
            repositories = repo;
            displayAccountInfo(repo.length > 0 ? repo[0].owner : {});
            displayRepositories(repo);
        });
    }

    function fetchAccountDetails() {
        const apiUrl = `https://api.github.com/users/${username}`;

        $.get(apiUrl, function(data) {
            displayAccountDetails(data);
        });
    }

    function displayAccountInfo(owner) {
        $('#account-photo').attr('src', owner.avatar_url);
        fetchAccountDetails();
    }

    function displayAccountDetails(account) {
        const accountDetailsContainer = $('#account-details');
        accountDetailsContainer.html(`
            <h2>${account.name}</h2>
            <p>${account.bio || 'No bio available.'}</p>
            <p>Followers: ${account.followers}</p>
            <p>Following: ${account.following}</p>
        `);
    }

    function displayRepositories(repositories) {
        const repositoriesContainer = $('#repositories');
        repositoriesContainer.empty();

        repositories.forEach(repo => {
            const repoHtml = `
                <div class="repository-card">
                    <h3>${repo.name}</h3>
                    <p>${repo.description || 'No description available.'}</p>
                    <p>Language: ${repo.language || 'Not specified'}</p>
                    
                </div>
            `;

            repositoriesContainer.append(repoHtml);
        });
    }

    $('#searchInput').on('input', function() {
        const searchTerm = $(this).val().toLowerCase();
        const filteredRepositories = repositories.filter(repo => repo.name.toLowerCase().includes(searchTerm));
        displayRepositories(filteredRepositories);
    });

    $('#searchUser').on('click', function() {
        const newUsername = prompt('Enter GitHub username:');
        if (newUsername) {
            username = newUsername;
            currentPage = 1;
            fetchRepositories();
        }
    });

    // Event listener for the "Show Repositories" dropdown
    $('#perPageSelector').on('change', function() {
        perPage = parseInt($(this).val(), 10);
        currentPage = 1;
        fetchRepositories();
    });

    // Initial fetch
    fetchRepositories();
});
