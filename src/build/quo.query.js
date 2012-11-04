// Generated by CoffeeScript 1.4.0

/*
  QuoJS 2.1
  (c) 2011, 2012 Javi Jiménez Villar (@soyjavi)
  http://quojs.tapquo.com
*/


(function() {

  (function($$) {
    var PARENT_NODE, classSelector, idSelector, tagSelector, _filtered, _findAncestors;
    PARENT_NODE = "parentNode";
    classSelector = /^\.([\w-]+)$/;
    idSelector = /^#([\w-]*)$/;
    tagSelector = /^[\w-]+$/;
    $$.query = function(domain, selector) {
      var dom_elements;
      if (classSelector.test(selector)) {
        dom_elements = domain.getElementsByClassName(selector);
      } else if (tagSelector.test(selector)) {
        dom_elements = domain.getElementsByTagName(selector);
      } else {
        dom_elements = domain.querySelectorAll(selector);
      }
      dom_elements = Array.prototype.slice.call(dom_elements);
      return dom_elements;
    };
    $$.fn.find = function(selector) {
      var result;
      if (this.length === 1) {
        result = Quo.query(this[0], selector);
      } else {
        result = this.map(function() {
          return Quo.query(this, selector);
        });
      }
      return $$(result);
    };
    $$.fn.parent = function(selector) {
      var ancestors;
      ancestors = (selector ? _findAncestors(this) : this.instance(PARENT_NODE));
      return _filtered(ancestors, selector);
    };
    $$.fn.siblings = function(selector) {
      var siblings_elements;
      siblings_elements = this.map(function(index, element) {
        return Array.prototype.slice.call(element.parentNode.children).filter(function(child) {
          return child !== element;
        });
      });
      return _filtered(siblings_elements, selector);
    };
    $$.fn.children = function(selector) {
      var children_elements;
      children_elements = this.map(function() {
        return Array.prototype.slice.call(this.children);
      });
      return _filtered(children_elements, selector);
    };
    $$.fn.get = function(index) {
      if (index === undefined) {
        return this;
      } else {
        return this[index];
      }
    };
    $$.fn.first = function() {
      return $$(this[0]);
    };
    $$.fn.last = function() {
      return $$(this[this.length - 1]);
    };
    $$.fn.closest = function(selector, context) {
      var candidates, node;
      node = this[0];
      candidates = $$(selector);
      if (!candidates.length) {
        node = null;
      }
      while (node && candidates.indexOf(node) < 0) {
        node = node !== context && node !== document && node.parentNode;
      }
      return $$(node);
    };
    $$.fn.each = function(callback) {
      this.forEach(function(element, index) {
        return callback.call(element, index, element);
      });
      return this;
    };
    _findAncestors = function(nodes) {
      var ancestors;
      ancestors = [];
      while (nodes.length > 0) {
        nodes = $$.map(nodes, function(node) {
          if ((node = node.parentNode) && node !== document && ancestors.indexOf(node) < 0) {
            ancestors.push(node);
            return node;
          }
        });
      }
      return ancestors;
    };
    _filtered = function(nodes, selector) {
      if (selector === undefined) {
        return $$(nodes);
      } else {
        return $$(nodes).filter(selector);
      }
    };
  })(Quo);

}).call(this);
