<footer>
    <ul>
        <li>Marian Senchyshen</li>
        <li>Maksym Brukvach</li>
        <li>Łukasz Zduniak</li>
        <!-- <li>Mark Smotkin</li> -->
    </ul>
</footer>

<style>
    footer {
        background-color: var(--primary);
        display: flex;
        justify-content: right;
        padding: 24px;
        background: var(--primary);
		background: linear-gradient(90deg, var(--primary) 0%, var(--accent) 30%, var(--primary) 100%);
    }

    ul {
        list-style: none;
        text-align: right;
    }

    li {
        color: var(--primary-text);
        text-decoration: solid;
        font-size: 24px;
        transition: .2s;    
    }

    li:hover  {
        scale: 105%;
    }
</style>