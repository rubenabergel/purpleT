app.directive('horiscroller', function uiJqInjectingFunction(){

function SideScroll(selector) {
    // Store reference to element
    this.$el = $(selector);

    // Add scroll listeners
    this.$el.on('mousewheel', function(event) {
      // Scroll left instead of down
      this.scrollLeft -= (event.originalEvent.wheelDeltaY);
      
      // Stop from actuall scrolling down
      event.preventDefault();
    });

    // Update when the window resizes
    $(window).on('resize', this.update.bind(this));

    // Perform initial calculation
    this.update();
  }
  
  SideScroll.prototype.update = function() {
    // Calculate height of container
    var height = this.$el.outerHeight();
    var width = this.$el.outerWidth();

    // Make boxes sized right
    var size;
    if (width > height)
      size = height;
    else
      size = width;

    this.$el.css({ fontSize: size });

    // Calculate width of children
    var width = 0;
    this.$el.find('.sidescroll-content .grid').children().each(function(index, el) {
      width += el.offsetWidth/2;
    });

    // Adjust content width
    this.$el.find('.sidescroll-content .grid').css({
      width: width
    });
  };
  
  SideScroll.prototype.add = function(el) {
    this.$el.append(el);
    this.update();
  };

  return {
    require: 'ngModel',
    templateUrl: '/views/templates/scroll.html',
    scope: {
      'ngModel': '='
    },
    compile: function uiJqCompilingFunction($templateElement, $templateAttribute) {
      return function uiJqLinkingFunction( $scope, $linkElement, $linkAttributes) {
        $scope.$watch('ngModel', function(v) {
          if (!v) return;
          var scroll = new SideScroll($linkElement[0]);
          console.log($linkElement[0]);
        });
      }
    }
  }


})