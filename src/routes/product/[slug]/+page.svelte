<script lang="ts">
    import type { PageData } from './$types';

    let { data }: { data: PageData } = $props();

    $inspect(data);
</script>

<h1>{data.name}</h1>
<p>{data.description}</p>
<img src={data.image} alt="123">
<h2>Price: {data.price}</h2>