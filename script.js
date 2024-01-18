$(document).ready(function() {
    const username = 'evoxf1'; // Replace with the desired GitHub username
    const perPage = 100;
    let currentPage = 1;

    function fetchRepositories() {
        $('#loader').show();

        const apiUrl = `https://api.github.com/users/${username}/repos?page=${currentPage}&per_page=${perPage}`;

        $.get(apiUrl, function(data, status) {
            $('#loader').hide();
            displayRepositories(data);
            displayPagination(data.length);
        });
    }

    function displayRepositories(repositories) {
        const repositoriesContainer = $('#repositories');
        repositoriesContainer.empty();

        repositories.forEach(repo => {
            const repoHtml = `
                <div class="repository">
                    <h3>${repo.name}</h3>
                    <p>${repo.description || 'No description available.'}</p>
                    <p>Language: ${repo.language || 'Not specified'}</p>
                </div>
            `;

            repositoriesContainer.append(repoHtml);
        });
    }

    function displayPagination(totalRepositories) {
        const totalPages = Math.ceil(totalRepositories / perPage);
        const paginationContainer = $('#pagination');
        paginationContainer.empty();

        for (let i = 1; i <= totalPages; i++) {
            const pageLink = `<a href="#" onclick="changePage(${i})">${i}</a>`;
            paginationContainer.append(pageLink);
        }
    }

    function changePage(page) {
        currentPage = page;
        fetchRepositories();
    }

    // Initial fetch
    fetchRepositories();
});
