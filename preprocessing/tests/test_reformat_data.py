import unittest

from reformat_data import get_detailed_location, clean_cost, get_short_objective, get_targets, \
    get_special_focus, clean_locations


class TestReformatData(unittest.TestCase):
    maxDiff = None

    def test_get_detailed_location_has_detailed_location(self):
        self.assertEqual("Oklahoma City, OK",
                         get_detailed_location(["Oklahoma", "Kansas", "Texas"], "Oklahoma City, OK"))

    def test_get_detailed_location_has_no_detailed_location(self):
        self.assertEqual(None, get_detailed_location(["Oklahoma", "Kansas", "Texas"], None))

    def test_get_detailed_location_has_redundant_detail_location(self):
        self.assertEqual(None, get_detailed_location(["Oklahoma", "Kansas", "Texas"], "Oklahoma"))

    def test_get_detailed_location_has_no_general_locations(self):
        self.assertEqual("Oklahoma City, OK", get_detailed_location([], "*Oklahoma City, OK"))

    def test_clean_cost_dollar(self):
        self.assertEqual("$100", clean_cost("$100"))

    def test_clean_cost_numeric(self):
        self.assertEqual("$100", clean_cost(" 100"))

    def test_clean_cost_quote(self):
        self.assertEqual("Cost Not Specified", clean_cost("Request a Quote"))

    def test_get_short_objective_short(self):
        self.assertEqual("This is short", get_short_objective("This is short"))

    def test_get_short_objective_long(self):
        input = ("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam maximus ligula "
                "massa, non accumsan mauris posuere nec. Mauris quis orci in diam fringilla "
                "efficitur. Nulla consectetur facilisis risus et fermentum. Pellentesque "
                "lobortis accumsan eros, eget ultrices sem accumsan eu. Aliquam eros odio, "
                "pulvinar vitae elementum sed, aliquet sed sem. Aenean dolor sem, ultricies sit "
                "amet purus ac, mollis interdum enim. Phasellus eget euismod magna, id lobortis "
                "lectus. Pellentesque egestas aliquam ligula in sollicitudin. Vivamus egestas ac "
                "ex eu volutpat. Aliquam dignissim euismod eleifend. Mauris sit amet nibh "
                "accumsan turpis facilisis dapibus. Phasellus justo magna, laoreet et posuere "
                "eu, bibendum sed elit. Pellentesque habitant morbi tristique senectus et netus "
                "et malesuada fames ac turpis egestas.")
        expected_output = ("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam maximus ligula "
                "massa, non accumsan mauris posuere nec. Mauris quis orci in diam fringilla "
                "efficitur. Nulla consectetur facilisis risus et fermentum. Pellentesque "
                "lobortis accumsan eros, eget ultrices sem accumsan eu. Aliquam eros odio, "
                "pulvinar vitae elementum sed, aliquet sed sem. Aenean dolor sem, ultricies sit "
                "amet purus ac, mollis interdum enim. Phasellus eget euismod magna, id lobortis "
                "lectus. Pellentesque...")
        self.assertEqual(expected_output, get_short_objective(input))

    def test_get_targets(self):
        self.assertEqual(
            ["Elementary school students", "Middle school students",
             "High school students", "Postsecondary students", "Other"],
            get_targets("Elementary, Middle, High, Postsecondary, Other"))

    def test_get_special_focus(self):
        pass

    def test_clean_locations_state_and_nonstate_list(self):
        self.assertEqual(sorted(["Kansas", "National", "Oklahoma", "Mississippi"]),
                         sorted(clean_locations("OK, National, MS, Kansas")))

    def test_clean_locations_state(self):
        self.assertEqual(["Oklahoma"], clean_locations("OK"))

    def test_clean_locations_nonstate(self):
        self.assertEqual(sorted(["National", "Virtual"]), sorted(clean_locations("Virtual, National")))
