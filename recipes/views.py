from django.http import Http404, HttpResponse
from django.shortcuts import get_object_or_404, render
from django.views import generic
from django.utils import timezone

from .models import Recipe, Ingredient, RecipeIngredient

class IndexView(generic.ListView):
    template_name = 'recipes/index.html'
    context_object_name = 'latest_recipe_list'

    def get_queryset(self):
        """ Return ten most recent recipes """
        return Recipe.objects.filter(
                pub_date__lte=timezone.now()).order_by('-pub_date')[:10]
        ## Tests: should return a list
        ## should not return recipes from future
        ## should return 10 most recent recipes

# class DetailView(generic.DetailView):
#     template_name = 'recipes/detail.html'
#     model = Recipe
#     def get_context_data(self, **kwargs):
#         context = super(DetailView, self).get_context_data(**kwargs) # get the default context data
#         context['test'] = 7
#
#         ## Format recipe ingredient strings
#         ## (1) format numbers
#         ##      if greater than one, round to one decimal.
#         ##      if whole number, remove trailing zeroes
#         ##      if less than 1, display as fraction
#         ## (1) pluralize units, if they exist
#         ##      manually specify any units that should be pluralized
#         ##      if "cup", pluralize depending on "amount"
#         ## (1) pluralize ingredient name, if no units, depending on "amount"
#         context["description_formatted"] = Recipe.objects.get('description')
#         ## (1) if not None, display "description" in parentheses
#
#         return context

## Trying a non-generic view, to see if it is easier to pass variables to template
def detail(request, recipe_id):
    recipe = get_object_or_404(Recipe, pk=recipe_id)

    ## Todo: define logic to format ingredients list here
    # n_ingredients = len(recipe.recipeingredient_set.all())
    # description_formatted = [None] * n_ingredients
    # for j in range(1,n_ingredients):
    #     description_formatted[j] = description[j]
    #
    # return render(request, 'recipes/detail.html',
    #         {'recipe': recipe,
    #          'description_formatted': description_formatted})

    return render(request, 'recipes/detail.html',
            {'recipe': recipe})


def vote(request, question_id):
    question = get_object_or_404(Question, pk=question_id)
    try:
        # Request.post: dictionary-like object that lets you access submitted data by a key name.
        # request.POST['choice'] returns the ID of the selected choice as a string.
        # request.POST always returns a string.
        selected_choice = question.choice_set.get(pk=request.POST['choice'])
    except (KeyError, Choice.DoesNotExist):
        # Redisplay the voting form
        return render(request, 'polls/detail.html', {
            'question': question,
            'error_message': "You didn't select a choice.",
            })
    else:
        #selected_choice.votes += 1
        # Update directly in databse, to avoid race conflicts
        selected_choice.votes = F('votes') + 1
        selected_choice.save()
        # Always return an HttpResponseRedirect after successfully dealing with POST data
        # This prevents data from being posted twice if a user hits the back button.
        return HttpResponseRedirect(reverse('polls:results', args=(question.id,)))


