function PannelController ($stateParams,$state, tmdbService) {
    console.log('pannel directive ctrl ok');   
    var pannel = this;
    pannel.type = $stateParams.type;
    console.log(pannel.type);
    
    // console.log($state.current);
 } 


export default PannelController