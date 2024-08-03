export default function Tags({ tags }:{tags:string}) {
   return ( 
        tags && 
        tags.split(',').map((tag, index) => (
            <div key={index} className="tag">
                {tag}
            </div>
        ))
    );
}